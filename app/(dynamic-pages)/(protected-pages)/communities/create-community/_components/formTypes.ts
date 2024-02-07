type FormProps<T> = {
  initialFormValues: T;
  onFormSubmit: (formData: T) => void;
  moveToPrevStep?: () => void;
};
