/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      if (response && response.user) {
        const modalRegister = App.getModal('register');

        App.setState('user-logged');
        this.element.reset();
        modalRegister.close();
      }
    });
  }
}
