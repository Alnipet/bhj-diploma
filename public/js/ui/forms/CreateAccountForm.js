/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      if (response && response.account) {
        const createAccount = App.getModal('createAccount');
        this.element.reset();
        createAccount.close();

        App.update();
      }
    });
  }
}
