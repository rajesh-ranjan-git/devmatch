interface WrapperProps {
  children: React.ReactNode;
}

const ErrorWrapper = ({ children }: WrapperProps) => {
  return <>{children}</>;
};

export default ErrorWrapper;
