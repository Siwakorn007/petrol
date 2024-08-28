const bcrypt = require('bcryptjs');

const hashPassword = async () => {
    const password = '1234';  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
};
hashPassword();
// ($2a$10$1anaVdEkKSMzYuBtSu2FLexKiu0lDf3P1hp15MgpYdfbS0H33vIvm)