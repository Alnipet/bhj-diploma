/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const userData = User.current();
    if (userData) {
      Account.list(userData, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        if (response.data) {
          const selectAccount = this.element.account_id;

          const accountListHTML = response.data.reduce((sumString, current) => {
            sumString += `
            <option value="${current.id}">${current.name}</option>
            `;

            return sumString;
          }, '');

          selectAccount.innerHTML = accountListHTML;
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      if (response && response.success) {
        let typeTransactionForm;

        if (this.element.id === 'new-income-form') {
          typeTransactionForm = 'newIncome';
        } else if (this.element.id === 'new-expense-form') {
          typeTransactionForm = 'newExpense';
        }

        const modalNewTransaction = App.getModal(typeTransactionForm);

        modalNewTransaction.close();
        this.element.reset();
        App.update();
      }
    });
  }
}
