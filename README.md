# Falling Thirds

An Ambient music HTML5 Audio app by Christopher Alcock

Falling Thirds is my most complete HTML5 Audio app as of March 2016.  It plays randomly-inverted, randomly-sped, randomly-looped, randomly-delayed, randomly-panned quasi-arpeggios in a falling thirds chord pattern, chosen as the unstrictly-synchronised loops will not clash with eachother, as the anteceding and preceding chords will always be harmonious, an approach taken from Steve Reich's Music for 18 Musicians.

The chord is determined by your clock (how many second into the month you are, to be precise), so as long as your clocks are accurate to within about 20 seconds, you can open the site on multiple devices and experience the sound environment in surround, which was the original intention of the piece.

The delay/echo effect on the notes adds a lot to the texture, but can be quite resource intensive, and so I've limited the buttons on the page to 5 concurrent layers of notes.  Even this could be too much for some older computers, so use sparingly or limit the amount of other resource-intensive things you are doing with your computer if you want to avoid the sound cutting out.


# Trouble-shooting

Essentially it will work if you are using Chrome or Firefox on a PC or Android phone, and have Javascript turned on.
Other issues could be caused by a clash with existing extensions, or you having more than 6 instances of AudioContext working in one browser window.

# Chord Sequence

C => Am => F => Dm => B♭ => Gm => E♭ => Cm => A♭ => Fm => D♭ => B♭m => G♭ => E♭m => B => A♭m => E => D♭m => A => G♭m => D => Bm => G => Em => C ...
