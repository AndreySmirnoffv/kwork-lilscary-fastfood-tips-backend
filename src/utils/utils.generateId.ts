export function generateId(){
    const randomPart = () => Math.floor(100 + Math.random() * 900).toString();
    return `${randomPart()}-${randomPart()}`;
  };