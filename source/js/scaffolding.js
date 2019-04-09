'use strict';
( function ()
{
	
	// Предотвращение клика для ссылок-заглушек
	
	document.querySelectorAll( '[href="#"]' ).forEach( function ( el )
	{
	
		el.addEventListener( 'click', function ( evt )
		{
			evt.preventDefault();
		}
		);
	
	}
	);
}
)();
