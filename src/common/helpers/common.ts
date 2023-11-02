import { plainToClass, ClassConstructor } from 'class-transformer';
import { PaginationMeta, Filter, Sort } from 'common/repositories/common.model';
import toApiError from 'common/repositories/to-api-error';
import { format } from 'date-fns';
import { client } from 'hooks/use-ky';
import { decamelizeKeys } from 'humps';
import qs from 'qs';

type MutationMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchMutationOptions<T> {
  url: string;
  method: MutationMethodType;
  body?: any;
  classType?: ClassConstructor<T>;
  params?: any;
}

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

export function debugBase64(title, base64URL) {
  const win = window.open();
  win?.document.write(
    `
    <title>${title}</title>
    <body style="margin:0;">
    <iframe src="
      ${base64URL}
      " frameborder="0" style="margin:0; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allow="fullscreen"></iframe>
    </body>
    `,
  );
}

export function MutationFetchFunction<T>({
  url,
  method,
  body,
  classType,
  params,
}: FetchMutationOptions<T>): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const newBody = body ? decamelizeKeys(body) : undefined;
    let _params = '';
    _params = params ? qs.stringify(params) : '';

    try {
      const json = (await client(url, {
        method,
        ...(_params
          ? {
              searchParams: _params,
            }
          : {}),
        ...(newBody
          ? {
              json: newBody,
            }
          : {}),
      })) as any;

      const contentType = json.headers.get('content-type');

      let newJson = json;

      if (
        contentType !== 'application/pdf' &&
        contentType !==
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        newJson = await json.json();
      } else {
        newJson = await blobToBase64(await json.blob());
      }

      const transformedJson = {
        ...newJson,
        ...(newJson?.data
          ? {
              data: classType
                ? plainToClass(classType, newJson.data)
                : newJson.data,
            }
          : {}),
      };

      resolve(
        contentType === 'application/pdf' ||
          contentType ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ? newJson
          : transformedJson,
      );
    } catch (e) {
      reject(await toApiError(e as Error));
    }
  });
}

interface QueryFetchOptions {
  url: string;
  params?: any;
}

export function QueryFetchFunction({
  url,
  params,
}: QueryFetchOptions): Promise<any> {
  return new Promise(async (resolve, reject) => {
    let _params = '';
    _params = params ? qs.stringify(params) : '';

    try {
      const json: any = await client
        .get(url, {
          ...(_params
            ? {
                searchParams: _params,
              }
            : {}),
        })
        .json();

      resolve(json);
    } catch (e: any) {
      reject(await toApiError(e));
    }
  });
}

export function ModelTransformer(data: any, dataType: any) {
  return plainToClass(dataType, data);
}

export function QueryTransformer(res: any, dataType?: any) {
  const { data: json } = res;
  const newJson = json?.data
    ? {
        ...json,
        ...(json?.data
          ? {
              data: dataType ? plainToClass(dataType, json?.data) : json?.data,
            }
          : {}),
        ...(json?.filters
          ? {
              filters: plainToClass(Filter, json.filters),
            }
          : {}),
        ...(json?.sorts
          ? {
              sorts: plainToClass(Sort, json.sorts),
            }
          : {}),
        ...(json?.meta
          ? {
              meta: plainToClass(PaginationMeta, json.meta),
            }
          : {}),
      }
    : {
        ...(dataType ? plainToClass(dataType, json) : json),
      };
  return {
    ...res,
    data: newJson,
  };
}

enum TimezoneEnum {
  wib = 'Asia/Jakarta',
  wita = 'Asia/Makassar',
  wit = 'Asia/Jayapura',
}

export enum TimezoneNumberEnum {
  wib = '+07:00',
  wita = '+08:00',
  wit = '+09:00',
}

export function TimezoneConverter(timezone) {
  return TimezoneEnum[timezone];
}

export function toTimezone(date: string, timezoneNumber: string) {
  return (
    format(new Date(date), 'yyyy-MM-dd') +
    'T' +
    format(new Date(date), 'HH:mm:ss') +
    timezoneNumber
  );
}
