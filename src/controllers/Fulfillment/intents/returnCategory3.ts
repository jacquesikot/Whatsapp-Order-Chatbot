import models, { connectDb } from '../../../models';

// Menu3-99
const returnCategory3 = async (agent: any) => {
  connectDb();
  const categories = await models.CategoryModel.find();
  const categoryName = categories.map((cat) => cat.name);
  let category = '';
  let i;
  for (i = 0; i < categoryName.length; i++) {
    category += i + ' ' + categoryName[i] + '\n';
  }

  agent.add('Our available *Categories:* \n' + `\n` + ` ${category}`);
};

export default returnCategory3;
