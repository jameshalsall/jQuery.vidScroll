/**
 * jQuery vidScroll
 *
 * Experimental plugin for controlling video scrubber with the scroll
 * position of the user's view port.
 *
 * @author  James Halsall <james.t.halsall@googlemail.com>
 * @link    http://www.github.com/jameshalsall/jQuery.vidScroll
 * @license GPL (http://www.gnu.org/licenses/gpl-3.0.html)
 */
(function($) {

    $.fn.vidScroll = function() {
        // the step size indicates how many seconds in the video to jump when scrolling
        var stepSize = 1;

        if ($(this).prop('tagName').toLowerCase() !== 'video') {
            throw new Error('Oops! That doesn\'t look like a <video> element to me!');
        }

        var video = $(this).get(0);
        var duration = 0;

        var interval = window.setInterval(function(i) {
            if (video.readyState) {
                duration = Math.round(video.duration);
                bindScroll();
                clearInterval(interval);
            }
        }, 500);

        /**
         * Binds the scroll events to the video scrubber
         */
        function bindScroll() {
            var container = $(document);
            var lastPos = container.scrollTop();
            container.on('scroll', function() {
                var height = container.height();
                var step = height / (duration / stepSize) / 100;
                var current = container.scrollTop();

                if ((current < lastPos) && (lastPos + current >= (lastPos + step))) {
                    lastPos = current;
                    video.currentTime = video.currentTime - step;
                } else if (lastPos - current < (step * -1)) {
                    lastPos = current;
                    video.currentTime = video.currentTime + step;
                }
            });
        }
    }

})(jQuery);
