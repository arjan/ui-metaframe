jQuery UI "metaframe" widget
============================

A metaframe is an information frame with extra options that appears
around an element (like an image) when hovering it.

It is very useful to add extra options to e.g. a list of thumbnails
without having to clutter the user interface with all those options;
they only are visible when the mouse hovers them.

Example HTML code:

    <li>
        <a class="metaframe-trigger" href="detailpage.html"><img src="thumbnail.png" /></a>
        <div class="metaframe-popup">
            <div class="metaframe-placeholder"></div>
            <div>
                <a href="#">download</a>
                <a href="#">share</a>
            </div>
        </div>
    </li>

The three `metaframe-` class names are important. The`"trigger`
element gets the onmouseover hover effect. The `popup` div is positioned
absolutely around the trigger. The placeholder element in the popup
will receive the contents of the trigger, so that the frame seems to
appear "around" the trigger.

The following code would add metaframe to each `li` element:

    $("<li>").metaframe();

See `metaframe.html` in the examples directory for a full example.
