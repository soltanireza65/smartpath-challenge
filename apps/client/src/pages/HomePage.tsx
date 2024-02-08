import { FC } from "react";
import { Link } from 'react-router-dom';

type IProps = {};

const HomePage: FC<IProps> = ({ }) => {
  return (
    <div>
      {import.meta.env.VITE_SOME_KEY}
      <Link to="/auth/signin">signin</Link>
      <Link to="/auth/signup">signup</Link>
    </div>
  );
};


export default HomePage