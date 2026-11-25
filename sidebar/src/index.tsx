import('./bootstrap').catch((error: unknown) => {
  console.error('Не удалось запустить sidebar:', error);
});
