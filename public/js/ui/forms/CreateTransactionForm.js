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
          const selectExpenseAccount = document.getElementById('expense-accounts-list');
          const selectIncomeAccount = document.getElementById('income-accounts-list');
          selectExpenseAccount.innerHTML = null;
          selectIncomeAccount.innerHTML = null;

          for (let item of response.data) {
            selectExpenseAccount.innerHTML += `
            <option value="${item.id}">${item.name}</option>
            `;

            selectIncomeAccount.innerHTML += `
            <option value="${item.id}">${item.name}</option>
            `;
          }
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
        if (this.element.id === 'new-income-form') {
          const modalNewIncome = App.getModal('newIncome');
          modalNewIncome.close();
        } else if (this.element.id === 'new-expense-form') {
          const modalNewExpense = App.getModal('newExpense');
          modalNewExpense.close();
        }

        this.element.reset();
        App.update();
      }
    });
  }
}
