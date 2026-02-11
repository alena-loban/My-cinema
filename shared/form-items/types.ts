export type TLabel =
  | {
      text: React.ReactNode | string;
      required?: boolean;
    }
  | string
  | React.ReactNode;
