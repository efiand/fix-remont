( function ()
{

	// Листание слайдера
	
	var slider = document.querySelector( '.photos' );
	var prevBtn = slider.querySelector( 'button.prev' );
	var nextBtn = slider.querySelector( 'button.next' );
	var slides = slider.querySelectorAll( 'li' );
	var current = Math.round( slides.length / 2 ) - 1;

	var addClasses = function ( current )
	{
		var prev = current - 1;
		var next = current + 1;
		
		slides.forEach(function ( el, i )
		{
			el.className = '';
			
			if ( i === current )
			{
				el.className = 'current';
			}
			else if ( i < current )
			{
				el.className = 'prev-prev';
			}
			else {
				el.className = 'next-next';
			}
		});
		
		if ( slides[prev] )
		{
			slides[prev].className = 'prev';
			prevBtn.classList.add( 'prev' );
		}
		else
		{
			prevBtn.classList.remove( 'prev' );
		}
		
		if ( slides[next] )
		{
			slides[next].className = 'next';
			nextBtn.classList.add( 'next' );
		}
		else
		{
			nextBtn.classList.remove( 'next' );
		}
	}

	// Листание по кнопке Назад
	
	prevBtn.addEventListener( 'click', function ()
	{
		current--;
		addClasses( current );
	}
	);

	// Листание по кнопке Вперёд
	
	nextBtn.addEventListener( 'click', function ()
	{
		current++;
		addClasses( current );
	}
	);

	// Начальное состояние
	
	slider.classList.add( 'slider' );
	addClasses( current );
}
)();
