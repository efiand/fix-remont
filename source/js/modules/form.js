( function ()
{
	var form = document.querySelector( 'form' );
	var submit = form.querySelector( 'button' );
	var modal = document.querySelector( '.modal' );
	var fields = form.querySelectorAll( 'input' );
	var Errors =
	{
		name: 'должны присутствовать непробельные символы',
		email: 'формат: mail@domain.tld',
		tel: 'формат: +X-XXX-XXX-XX-XX'
	};
	
	// Операции при закрытии модального окна
	
	var modalHandler = function ()
	{
		form.reset();
		initAllLabels();
		modal.classList.remove( 'interactive' );
	};
	
	// Закрытие модального окна при клике по произвольной области
	
	var modalClickHandler = function ( evt )
	{
		if ( evt.target.tagName !== 'BUTTON' )
		{
			modalHandler();
			document.removeEventListener( 'click', modalClickHandler );
		}
	};
	
	// Закрытие модального окна по Esc
	
	var modalKeydownHandler = function ( evt )
	{
		if ( evt.keyCode === 27 )
		{
			modalHandler();
			document.removeEventListener( 'keydown', modalKeydownHandler );
		}
	};
	
	// Все LABEL в исходное состояние
	
	var initAllLabels = function ()
	{
		form.querySelectorAll( 'label' ).forEach( function ( el )
		{
			el.classList.add( 'init' );
		}
		);
	};
	
	// Валидация полей
	
	var addInvalidListener = function ( el )
	{
		var label = el.parentNode.querySelector( 'label' );
		var labelText = label.textContent;
		
		// При вводе
		
		var elChangeHandler = function ( evt )
		{
			evt.preventDefault();
			
			if ( el.name === 'name' )
			{
				if ( el.value.match( /^\s+$/ ) )
				{
					el.value = el.value.trim();
				}
				else
				{
					el.value = el.value.replace( /\s/g, ' ' );
				}
			}
			
			el.className = el.validity.valid ? '' : 'invalid';
			label.textContent = labelText + ( el.validity.valid
				? ''
				: '  ( ' + Errors[el.name] + ' )' );
		};

		// Класс LABEL в зависимости от состояния поля
		
		var labelClassHandler = function ()
		{
			label.className = el.value || el.classList.contains( 'invalid' )
			? ''
			: 'init';
		};

		el.addEventListener( 'input', elChangeHandler );

		// Активация кнопки в момент полной валидации
		
		el.addEventListener( 'input', function ()
		{
			if ( form.checkValidity() )
			{
				submit.removeAttribute( 'disabled' );
			}
			else
			{
				submit.setAttribute( 'disabled', '' );
			}
		}
		);
		
		el.addEventListener( 'focus', function ()
		{
			label.className = '';
		}
		);
		
		el.addEventListener( 'blur', labelClassHandler );
	};
	
	fields.forEach( function ( el )
	{
		addInvalidListener( el );
	}
	);

	// Обработка отправки
	
	form.addEventListener( 'submit', function ( evt )
	{
		evt.preventDefault();
		modal.classList.add( 'interactive' );
		document.addEventListener( 'click', modalClickHandler );
		document.addEventListener( 'keydown', modalKeydownHandler );
	}
	);

	// Начальное состояние
	
	initAllLabels();
	submit.setAttribute( 'disabled', '' );
}
)();
