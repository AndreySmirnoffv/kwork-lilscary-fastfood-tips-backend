export function generateId(){
    const randomPart = () => Math.floor(100 + Math.random() * 900).toString(); // Генерируем случайное трехзначное число
    return `${randomPart()}-${randomPart()}`;
  };