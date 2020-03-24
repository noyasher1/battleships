I didn't go deeply into all the code (notice that I barely noted specific code segments) but I do have some general notes:

* I noticed you create very long function, both in line count and params count, this makes it very hard to understand what's going on.
  The golden rule is 3 params max and 6 lines max. Now I know that there are exceptions, and sometime it's hard to shrink a function to just 6 lines,
  but try to divide it to segments or even try to simplify some of your expressions, use one-liners and avoid using a lot of if-else. For the params limit, while
  there is no real way to use named-params, there are some hacks like using the spread operator --> function a({num: 5, num2: 7}) this makes it easier both to call the function
  and to expand it if needed (since you don't need to care for the order of the params)

* Some of my notes refer to a specific part or file, but can be applied to other parts of the code that follow similar patterns. I trust that you can cast them on as well

* it was rather difficult to understand the flow of things. I'm sure that you perfectly understand what's going on in each part, but sometimes it's hard for an outsider
  to dive in and figure out the flow of your application. I recommend you to take a break once in a while and try to read and understand the code like it's not your own.
  This can help you find the weak parts and drastically improve the way you write code and make it far more readable

* I think a better architecture would be to create "instanced" handlers for each session of the game instead of static, stateless ones.
  This, in my opinion can better express the flow of things and be more easily managed and extended in the future

* I really like the way you created react-like components on the client side under the models folder, however, try to separate models from UI logic as much as possible.
  They are meant to be pure from logic and only contain data

* There is some overlap between server and client on some parts (config, models, etc...), you can possibly create a shared common folder that holds these segments.