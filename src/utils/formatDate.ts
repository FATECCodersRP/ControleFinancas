const formatDate = (date: string): string => {
    // Cria o objeto Date com compensação para fuso horário
    const dateFormatted = new Date(date);
    const correctedDate = new Date(dateFormatted.getTime() + dateFormatted.getTimezoneOffset() * 60000);

    const year = correctedDate.getFullYear();
    
    const day = correctedDate.getDate() > 9 
        ? correctedDate.getDate() 
        : `0${correctedDate.getDate()}`;
    
    const month = correctedDate.getMonth() + 1 > 9
        ? correctedDate.getMonth() + 1 
        : `0${correctedDate.getMonth() + 1}`; 
 
    return `${day}/${month}/${year}`;
};

export default formatDate;