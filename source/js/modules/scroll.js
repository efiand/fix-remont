( function ()
{
	var header = document.querySelector( 'header' );
	var SPEED = 1;

	// Плавный сколлинг
	
	header.querySelectorAll( 'a' ).forEach( function ( el )
	{
		el.addEventListener( 'click', function ( evt )
		{
			var offset = window.pageYOffset;
			var hash = el.href.replace( /[^#]*(.*)/, '$1' );
			
			var distance = document.querySelector( hash )
				.getBoundingClientRect().top;
			
			var start = null;
			
			var step = function ( time )
			{
				start = start || time;
				var progress = time - start;
				
				var scrollPos = distance < 0
					? Math.max( offset - progress / SPEED, offset + distance )
					: Math.min( offset + progress / SPEED, offset + distance );
				
				window.scrollTo( 0, scrollPos );
				
				if ( scrollPos != offset + distance )
				{
					requestAnimationFrame( step );
				}
				else
				{
					location.hash = hash;
				}
			}
			
			requestAnimationFrame( step );
		}
		);
	}
	);
}
)();
