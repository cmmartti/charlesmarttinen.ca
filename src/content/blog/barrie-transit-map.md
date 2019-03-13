---
slug: barrie-transit-map
datePublished: 2019-01-03T04:26:30.084Z
dateUpdated: 2019-01-03T04:26:30.084Z
title: Re-drawing the Barrie Transit Map
tags:
  - map
  - case-study
image: /images/barrie-transit-map-lenses.png
excerpt: >-
  Every good city has a public transit system, and every good transit system has
  a map. But not all maps are made equal, and so over the past year or so, I've
  spent some of my spare time re-drawing my city's mediocre bus map.


  In this case study, I'll cover what a transit map is, what it's used for, and
  what makes a good transit map, and the changes I made when re-drawing the City
  of Barrie's bus map.
---

Every good city has a public transit system, and every good transit system has a map. But not all maps are made equal, and so over the past year or so, I've spent some of my spare time re-drawing my city's mediocre bus map.

In this case study, I'll cover what a transit map is, what it's used for, and what makes a good transit map, and the changes I made when re-drawing the City of Barrie's bus map.

Transit maps encompasses things like maps for subway and commuter trains, but here I'll focus primarily on bus maps, which differ from the former in that they tend to be geographically accurate.

--------------------------------------------------------------------------------

# What is a transit map?

The primary purpose of a transit map is to inform users of available services, and how these services can be accessed. This is altogether different from a regular street map, and so it may not contain features normally present on a street map. Streets, for example, might be missing altogether.

In addition, the map is the face of a transit system, and just like a real face, an ugly and difficult to understand map turns people away from using transit. Particularly in most American and Canadian cities, where traffic congestion is high and the comfort and convenience of modern cars makes public transit unappealing, it is in everyone's best interest to make public transit as attractive as possible.

The map also serves as the basis for the mental model that riders use to navigate the system, and a flawed mental model can lead users to make inefficient or wrong decisions (this point is somewhat mitigated by the just-look-out-the-window factor inherently present in surface transit but is especially salient in underground rapid transit, where passengers cannot see the outside world).

With the increasingly common use of smartphones, digital mapping apps like CityMapper and Google Maps have provided an alternate means of route planning, but not all people have access to them, particularly those with low incomes (who are less likely to have expendable income). Furthermore, they are more suited to on-the-spot navigation, not future planning, and typically require an active Internet connection. Thus, there is still a need for traditional static maps.

## How are they used?

Following the purposes discussed above, bus maps are used by transit users to plan a route between two points. First, the user locates these points on the map, then looks for a route that directly connects them, if possible. If either of their points is not directly served by a route, they need to select a walking route to the nearest bus stop, and if a single route does not connect the two points, they need to determine the best place to transfer to a different route.

In addition, maps are used in both paper and on-screen formats (PDF). Paper maps may be posted on a wall or in a fold-up pocket map, and PDF maps might be used on a smart phone or at a PC. The design of the map needs to make all of these use cases as easy to perform as possible.

# Design Constraints

A good map is selective in what information it displays, based on whether it serves the primary purposes and use cases. There is limited space on a transit map, and any information that does not serve these primary purposes only adds noise, detracting from other important elements.

Key among the details that are often omitted are roads themselves. This is because if a bus does not travel along a road, that road is no longer relevant, except from a pedestrian viewpoint. Roads that buses do travel on are traced by the route lines, making extra road lines redundant. Road names, of course, are still present, but only where relevant.

Below is a portion of the Toronto Transit Commission's system map that demonstrates this detail. It is clear to see that if every road was present, the map would devolve into a cluttered mess (the map covers an area about 4 km wide).

![](/images/ttc-1.png)

However, that does not mean that a transit map can never display roads. The TTC is a massive system that moves close to three million people a day across a huge area. In comparison, Barrie Transit moves around three million riders per year around a comparatively tiny city. What this means is that the underlying street grid can be shown at a large enough scale that it is still helpful to people trying to place themselves on the map.

On my re-drawn map, I have placed the street grid on a bottom layer. The roads themselves are of a low enough contrast that they do not compete with the route lines, which are drawn with thicker, coloured lines:

![](/images/example-1.png)

In the case of Barrie, however "street grid" is a misnomer. Due to its placement around a large, narrow bay (Kempenfelt Bay on Lake Simcoe), Barrie has a fairly convoluted road network that is very unlike Toronto's grid. Because of this, its bus routes are also convoluted. Combined with one of the system's goals to transport riders to their destinations with a minimum of transfers, this means that many of the system's routes cover similarly large surface areas and overlap each other along portions of their routes, qualities that do not work well with single colour line maps like Toronto's.

It is fortunate, then, that Barrie has relatively few routes. Few enough that each can be assigned a colour with space enough for relatively chunky lines. I imitated the official map in this regard but chose to be much more particular about how I drew my lines. I took care to ensure that each line is of equal thickness and that lines overlap a minimum of times and are equally spaced apart. I also chose colours that stand out on their own but are not likely to be confused with one another, even when printed in greyscale.

It is also important that the map is small enough that it is still practical. Preferably, the map should be small enough that it can easily be made into a pocket map, but large enough that it is still viewable without a magnifying glass. With some careful use of large font sizes, thick route lines, and an inset area of the map, I was able to fit my map onto a regular letter size page (8.5"x11"). This also means that most people will be able to print it out on their home printers. Of course, this does not leave enough room for even a legend, relegating it to the reverse side of the page, so I have also designed the map in a large, roomier size of 11"x17". Both options are available as PDF files.

# Other map elements

Not everything needs an explanation, so I will briefly cover those of interest.

## One-way arrows (see image above)

Along portions of some routes, buses travel in only one direction, and the map needs to reflect this. Usually, this is done with some sort of arrow, as can be seen on Toronto's map below and in [this collection of one-way arrows](http://transitmaps.tumblr.com/post/93730157560/one-way-arrows) that Cameron Booth put together on his [Transit Maps blog](http://www.transitmap.net/).

![](/images/ttc-2.png)

## Parks

Though not at all necessary, I have also shown parks and wooded areas as lightly-shaded green areas on the map. This is mostly for aesthetic reasons, but also to more accurately convey the "shape" of the city to users.

![](/images/example-2.png)

## Express routes and stops

Unlike subways, buses can stop at any point along their routes, and stops are often placed so close together that there is no point in showing where buses stop (the answer is "everywhere"). This is also why bus maps generally match real geography quite closely, whereas rapid transit systems like subways can only be accessed at stations (thus, all the areas in between stations are irrelevant). However, express bus services resemble subways in that stops are spread far apart, so it is important to communicate to passengers where these stops are.

Indeed, Barrie recently gained an express bus route (100), which travels alongside more heavily used routes in the city's north end. I have chosen to display these express stops as small red "lights" (or dots) along the express route. The express route line itself is rendered as alternating light and dark grey dashed line to differentiate it from regular routes (grey because it travels alongside the black route 8). Any future express routes can have a similar appearance, in other colours (depending on which routes they parallel).

![](/images/example-3.png)

## Lenses over congested areas

Around the downtown terminal, Allandale Waterfront GO train station, and Park Place, a large number of routes travel along the same roads, creating this effect (this is the official map):

![](/images/barrie-transit-1.png)

In other words, a bit of a mess. To clean this up a bit, I was inspired by [Transport for London's bus spider maps](https://tfl.gov.uk/maps_/bus-spider-maps) to create a "lens" over the area that concentrated the multitude of routes into a single line. Like this:

![](/images/example-4.png)

TfL's spider maps show a regional hub as a central map without route lines with spider lines for each route spreading out from each side.

![](/images/spider-map.png)

# How did you make it?

My map is based on a street map exported from [OpenStreetMaps](https://www.openstreetmap.org/#map=13/44.3748/-79.6832) and processed in [Maperitive](http://maperitive.net/) before being imported into Adobe Illustrator, which I used to draw each of the map elements.
