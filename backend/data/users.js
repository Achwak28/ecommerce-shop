import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Achouak Cherif',
    email: 'achouak@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Cherif Achwak',
    email: 'achwak@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
