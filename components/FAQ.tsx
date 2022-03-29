interface IFAQProps {
  title: string;
  content: string;
}

const FAQ = ({ title, content }: IFAQProps): JSX.Element => {
  return (
    <div className="flex flex-col space-y-2">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default FAQ;
