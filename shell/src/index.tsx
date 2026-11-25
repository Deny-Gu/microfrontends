import('./bootstrap').catch((error: unknown) => {
  console.error('Не удалось запустить приложение shell:', error);
});
