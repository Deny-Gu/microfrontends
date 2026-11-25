import { matchPath, useLocation } from 'react-router';

const pageTitles = [
  { path: '/', title: 'Главная' },
  { path: '/agents', title: 'Агенты' },
  { path: '/incidents', title: 'Инциденты' },
];

const Header = () => {
  const { pathname } = useLocation();
  const title =
    pageTitles.find(({ path }) => matchPath(path, pathname))?.title ??
    'Страница не найдена';

  return (
    <header className="app__header">
      <span className="app__header-title">{title}</span>
    </header>
  );
};

export default Header;
