import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues> | ((data: FieldValues) => Promise<void>);
  resetOnSuccess?: boolean;
} & TFormConfig;

const CSForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
  resetOnSuccess = false,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    try {
      await onSubmit(data);
      if (resetOnSuccess) {
        reset();
      }
    } catch (error) {
      // Handle error if needed
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default CSForm;
