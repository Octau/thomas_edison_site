interface MediatorSubscribe {
  onSuccess: (res: any) => any;
  onFailed: (rej: any) => any;
}

export function FetchMediator(fn: any): () => Promise<any> | undefined {
  let pub: any;
  let promises: MediatorSubscribe[] = [];

  return function (...args) {
    if (!pub) {
      return new Promise((res, rej) => {
        pub = fn(...args)
          .then((cur: any) => {
            if (promises?.length > 1) {
              promises?.map((promise) => {
                promise.onSuccess(cur);
              });
            }
            res(cur);
          })
          .catch((e: any) => {
            if (promises?.length > 1) {
              promises?.map((promise) => {
                promise.onFailed(e);
              });
            }
            rej(e);
          })
          .finally(() => {
            // reset current mediator after finished
            promises = [] as any;
            pub = undefined;
          });
      });
    } else {
      return new Promise((res, rej) => {
        promises.push({
          onSuccess: (result) => res(result),
          onFailed: (result) => rej(result),
        });
      });
    }
  };
}
