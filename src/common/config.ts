import invariant from 'invariant';

function required(name: string, value?: string): string {
  invariant(value !== undefined, `${name} is required on env vars`);
  return value!;
}

const config = {
  apiEndpoint: required(
    'NEXT_PUBLIC_API_ENDPOINT',
    process.env.NEXT_PUBLIC_API_ENDPOINT,
  ),
  authSession: 'thomas-auth.session-token',
  specialId: required(
    'NEXT_PUBLIC_SPECIAL_ID',
    process.env.NEXT_PUBLIC_SPECIAL_ID,
  ),
};

export default config;
