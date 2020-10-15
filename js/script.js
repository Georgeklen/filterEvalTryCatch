const filterByType = (type, ...values) => values.filter(value => typeof value === type),  // собираем значения в массив и фильтруем их по типу


	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //массив  c дивовaми
		responseBlocksArray.forEach(block => block.style.display = 'none');   // всем этим дивам  указан display: none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // фунция показа результата
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';  // тому диву, у которого класс blockSelector - показываем его
		if (spanSelector) { // а если есть spanSelector,
			document.querySelector(spanSelector).textContent = msgText;  //то в него записываем сообщение
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // принимает сообщение об ошибки, и показывает ошибку 

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // принимает результат и показывает ошибку
      
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // разблокирует див

	tryFilterByType = (type, values) => { // принимает тип и значения введенные
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // сбор в строку через запятую
			const alertMsg = (valuesArray.length) ? // если  не пуст массив то
				`Данные с типом ${type}: ${valuesArray}` : // выводим сообщение с выбраеным типом
				`Отсутствуют данные типа ${type}`;  // иначе Отсутствуют данные типа
			showResults(alertMsg); // вызов функции 
		} catch (e) { 
			showError(`Ошибка: ${e}`); // вызов ошибки в случае ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // knopka

filterButton.addEventListener('click', e => { // вешаем слушатель по клику
	const typeInput = document.querySelector('#type'); // получаем тип
	const dataInput = document.querySelector('#data'); // получаем все значения которые вводили

	if (dataInput.value === '') {  // если ничего не ввели
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // то появляется сообщение  Поле не должно быть пустым!
		showNoResults(); // вызов функции 
	} else { // иначе
		dataInput.setCustomValidity(''); // очищаем инпут
		e.preventDefault(); // убираем перезагрузку
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываем фильтратор
	}
});

