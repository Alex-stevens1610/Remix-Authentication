import { forwardRef, useId } from "react";

export let Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="form-input block w-full rounded-md border-0 p-1.5 text-neutral-200 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-800 sm:text-sm sm:leading-6"
    />
  );
});

export let Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className="block text-sm font-medium leading-6 text-neutral-300"
    />
  );
});

export let LabeledInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: React.ReactNode;
    id?: string;
  }
>(({ id, label, ...props }, ref) => {
  let uid = useId();
  id = id ?? uid;
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">
        <Input {...props} ref={ref} id={id} />
      </div>
    </>
  );
});