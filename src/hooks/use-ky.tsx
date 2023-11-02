import { refreshToken as refreshTokenFunc } from 'api-hooks/auth/mutation';
import Config from 'common/config';
import { FetchMediator } from 'common/helpers/fetch-mediator';
import logout from 'common/utils/auth';
import { camelizeKeys } from 'humps';
import invariant from 'invariant';
import ky from 'ky';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';

export interface KYStateProps {
  credential?: any;
  setCredential: React.Dispatch<React.SetStateAction<any>>;
  setRedirectLogout?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KYContext = React.createContext<KYStateProps>({
  credential: undefined,
  setCredential: () => {},
});

interface Props {
  userCredential?: any;
  children: React.ReactNode;
}

const config = {
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [401],
  },
  prefixUrl: Config.apiEndpoint + '/api/user',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
  },
  hooks: {
    afterResponse: [
      async (_request, _options, res) => {
        const contentType = res.headers.get('content-type');
        let newResponse = res.clone();
        if (contentType && contentType.includes('application/json')) {
          const json = await res.json();
          const { status, statusText, headers } = res;
          newResponse = new Response(JSON.stringify(json), {
            status,
            statusText,
            headers,
          });
        }

        if (
          contentType &&
          (contentType.includes('application/pdf') ||
            contentType.includes(
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ))
        ) {
          const { status, statusText, headers } = res;
          const blob = await res.blob();

          newResponse = new Response(blob, {
            status,
            statusText,
            headers,
          });
        }

        return newResponse;
      },
    ],
    beforeRetry: [
      ({ request, options, error, retryCount }) => {
        request.headers.set('x-retry', retryCount.toString());
      },
    ],
  },
};

export let client = ky.create(config);

export async function setBeforeRetry(
  func: ({ request, options, error, retryCount }) => void,
) {
  client = await client.extend({
    hooks: {
      beforeRetry: [func],
    },
  });
}

export function setupToken(token?: string): void {
  if (token) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  } else {
    delete (config.headers as any).Authorization;
  }
  client = client.extend(config);
}

export async function setLogoutHook(func: (request, _, response) => void) {
  //@ts-expect-error
  config.hooks.afterResponse[1] = func;
  client = client.extend(config);
}

export async function setupBeforeHooks(token: string | null) {
  client = await client.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (token && !request.headers.get('x-retry')) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        },
      ],
    },
  });
}

export async function setupBeforeRetry(
  func: ({ request, options, error, retryCount }) => void,
) {
  client = await client.extend({
    hooks: {
      beforeRetry: [func],
    },
  });
}

export default function KYContainer(props: Props) {
  const [userCredential, setUserCredential] = React.useState<any | undefined>();
  const [renderChild, setRenderChild] = React.useState<boolean>(false);
  //   const [refreshIndex, setRefreshIndex] = React.useState(0);
  const [redirectLogout, setRedirectLogout] = React.useState<boolean>(false);
  const router = useRouter();
  // const { mutateAsync } = useRefreshToken();

  const { children } = props;

  client = client.extend({
    headers: {
      'Accept-Language': router.locale ? router.locale : 'id',
    },
  });

  const refreshTokenMediator = React.useMemo<
    (refreshToken: string) => any
  >(() => {
    return FetchMediator(
      async (refreshToken) => await refreshTokenFunc(refreshToken),
    );
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutFunc = async (request, _, response) => {
    if (response.status === 401 && request.headers.get('x-retry')) {
      setRedirectLogout(true);
      await logout();
    }
  };

  const beforeRetryFunc = React.useCallback(
    async ({ request, options, error, retryCount }) => {
      request.headers.set('x-retry', retryCount.toString());
      try {
        const session = global?.refreshToken
          ? await refreshTokenMediator(global?.refreshToken)
          : null;

        if (session) {
          request.headers.set(
            'Authorization',
            `Bearer ${session?.data?.access_token}`,
          );

          global.refreshToken = session?.data?.refresh_token;

          await localStorage.setItem(
            Config.authSession,
            JSON.stringify(await camelizeKeys(session?.data)),
          );

          await setUserCredential(await camelizeKeys(session?.data));
          await setupBeforeHooks(session?.data?.access_token);
        }
      } catch {
        setRedirectLogout(true);
        await logout();
      }
    },
    [refreshTokenMediator],
  );

  React.useEffect(() => {
    async function exec() {
      await router.push('/login');
      setRedirectLogout(false);
      setRenderChild(false);
    }

    if (redirectLogout) {
      exec();
    }
  }, [redirectLogout, router]);

  React.useEffect(() => {
    async function exec() {
      if (userCredential) {
        await setupBeforeHooks(userCredential?.accessToken);
      } else {
        const session = await localStorage.getItem(Config.authSession);
        if (session) {
          const currentSession = JSON.parse(session);
          await setupBeforeHooks(currentSession?.accessToken);
          setUserCredential(currentSession);
        } else {
          await router.push('/login');
        }
      }

      await setLogoutHook(logoutFunc);
      await setBeforeRetry(beforeRetryFunc);
      //   setRefreshIndex(1);
      setRenderChild(true);
    }

    if (!renderChild) {
      exec();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beforeRetryFunc, logoutFunc, renderChild, userCredential]);

  const value = React.useMemo<KYStateProps>(
    () => ({
      credential: userCredential,
      setRedirectLogout,
      setCredential: async (credential) => {
        if (!credential) {
          setUserCredential(undefined);
        } else {
          await setupBeforeHooks(credential.accessToken);
          setUserCredential(credential);
        }
      },
    }),
    [userCredential],
  );

  return (
    <KYContext.Provider value={value}>
      {renderChild ? children : null}
    </KYContext.Provider>
  );
}

export function useKY() {
  const context = React.useContext(KYContext);

  invariant(
    context !== undefined,
    'useCredential must be used inside Credential Container',
  );

  return context;
}
