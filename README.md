# Falling Thirds

An Ambient music [HTML5 Audio](https://en.wikipedia.org/wiki/HTML5_Audio) app by Christopher Alcock.

Falling Thirds is my most complete HTML5 Audio app as of March 2016.  It plays randomly-[inverted](https://en.wikipedia.org/wiki/Inversion_(music)#Chords), randomly-[sped](https://en.wikipedia.org/wiki/Tempo), randomly-[looped](https://en.wikipedia.org/wiki/Loop_(music)), randomly-[delayed](https://en.wikipedia.org/wiki/Delay_(audio_effect)), randomly-[panned](https://en.wikipedia.org/wiki/Panning_(audio)) quasi-[arpeggios](https://en.wikipedia.org/wiki/Arpeggio) in a falling thirds chord pattern, chosen as the [unstrictly-synchronised](https://en.wikipedia.org/wiki/Phase_music) loops will not [clash](https://en.wikipedia.org/wiki/Consonance_and_dissonance#Dissonance) with eachother, as the anteceding and preceding chords will always be [harmonious](https://en.wikipedia.org/wiki/Consonance_and_dissonance#Consonance), an approach taken from [Steve Reich](https://en.wikipedia.org/wiki/Steve_Reich)'s [Music for 18 Musicians](https://en.wikipedia.org/wiki/Music_for_18_Musicians).

The chord is determined by your clock (how many second into the month you are, to be precise), so as long as your clocks are accurate to within about 20 seconds, you can open the site on multiple devices and experience the sound environment in surround, which was the original intention of the piece.

# Trouble-shooting

Essentially it will work if you are using Chrome or Firefox on a PC or Android phone, and have Javascript turned on.
Other issues could be caused by a clash with existing extensions, or you having more than 6 instances of AudioContext working in one browser window.

The delay/echo effect on the notes adds a lot to the texture, but can be quite resource intensive, and so I've limited the buttons on the page to 5 concurrent layers of notes.  Even this could be too much for some older computers, so use sparingly or limit the amount of other resource-intensive things you are doing with your computer if you want to avoid the sound cutting out.

If you just want to hear it and don't care about the visuals, an earlier, simpler, less-well-written version of the audio part of the site is available [here](http://variousmusicappsofchris.herokuapp.com/sym2).

# Chord Sequence

... C => Am => F => Dm => B♭ => Gm => E♭ => Cm => A♭ => Fm => D♭ => B♭m => G♭ => E♭m => B => A♭m => E => D♭m => A => G♭m => D => Bm => G => Em => C ...

# Thanks

Particular thanks go to [Joe Corcoran](https://corcoran.io/), [Dan Harvey](http://internetisverymuchmybusiness.com/) and Alex Norman for advice on code, and to [Matt McKegg](https://github.com/mmckegg) for his amazingly helpful [Web Audio School](http://mmckegg.github.io/web-audio-school/) that showed me how easy writing for HTML5 Audio components is.

Any further advice or ideas for the app, its functions or appearance would be gratefully received - contact me on [twitter](http://twitter.com/chrisalcockdev) or through github pull requests.

# Please give me a job

I'm based in London and trying to make a career change into Web Development. My CV can be found [here](http://github.com/christopheralcock/cv). I'm not looking for anything specifically to do with music.
