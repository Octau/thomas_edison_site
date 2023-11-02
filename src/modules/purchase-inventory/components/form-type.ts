import * as Yup from 'yup';

export const PIItemSchema = Yup.object()
  .shape({
    type: Yup.string().oneOf(['new', 'add']),
    item: Yup.object()
      .shape({
        name: Yup.string().required(),
        buyPrice: Yup.number().min(0).required(),
        sellPrice: Yup.number().min(0).required(),
        minSellPrice: Yup.number().min(0).required(),
        amount: Yup.number().min(0).required(),
        type: Yup.string().required(),
      })
      .required(),
  })
  .required();

export const PISchema = Yup.object()
  .shape({
    items: Yup.array().of(PIItemSchema).min(1).required(),
    createdAt: Yup.date().nullable().strip(true),
    transactionAt: Yup.date().nullable().required(),
    supplierId: Yup.string().nullable().required(),
  })
  .required();
