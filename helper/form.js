const Form = require("../models/Form");

module.exports = {
  create: (formConfig) => {
    return new Promise(async (resolve, reject) => {
      // const Form
      const { template, validationSchema } = formConfig;
      const label = formConfig["sidebar-name"];
      const path = formConfig["sidebar-path"];
      const title = formConfig["page-title"];
      const subTitle = formConfig["page-sub-title"];
      try {
        const newForm = await Form.create({
          template,
          validation: validationSchema,
        });
        const newSidebar = await Sidebar.create({ label, path });
        const newPage = await Page.create({
          title,
          subTitle,
          components: [newForm._id],
          componentName: "Form",
        });
        const newPanel = await Panel.create({
          title,
          subTitle,
          components: [newForm._id],
          componentName: "Form",
        });
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  },
};
