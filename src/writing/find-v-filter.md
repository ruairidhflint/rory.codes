---
layout: 'writing.njk'
title: Find vs Filter in Javascript
permalink: /find-vs-filter/
date: '2020-03-20'
---

How many built in Array methods can you name? Off the top of my head I came up with: _map, filter, reduce, find, pop, push, shift, unshift, forEach, concat and includes._ At time of writing, there are at least [32](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Instance_methods), I named less than a third!

The beauty of programming is that we are problem solving. We take our tool kit, which may contain less than a third of the tools available, and use what we have at hand to get to a solution. Maybe afterwards we go back and refine things but ultimately we will sacrifice efficiency and elegance in exchange for workability.

## Filter( )

Up until recently I have been using filter( ), a lot. Perhaps you have too. My most common use case would be something like the following:

```js
// Some data stored in state most likely from an API.
const myData = [{id: 1, content="abc"}, {id: 2, content="def"}, {id: 3, content="ghi"}];

// A particular piece of data is required (eg. A user chooses an item)
const selectedDataID = 2;

// Using the ID of the selected data, we filter the array and grab the item that matches.
const displayData = myData.filter(item => {
  return item.id === selectedDataID;
});

// Result ==> displayData = [{id: 2, content="def"}]

```

In short, we have an array which is filled with data, probably being pulled from an API, that is rendered to the screen or is sitting behind the scenes waiting to be used. A user might click an item to enlarge, to open a new view or to save it to their account, so we pass the ID of the selected item to our filter method that then loops through the data, finds the relevant matching item and eliminates the rest, allowing us to work precisely with the item selected. Perfect. Or so I thought.

### The Problem

Well, problem isn't fair. Filter is really, really good at filtering. It's in the name. If we have data stored in an array and pass it a condition, it will check every single item to ensure it doesn't miss anything, and return all those that meet our criteria. This explains why the result returned is an array:

```js
const numbers = [12, 43, 52, 91, 42, 101, 98, 11]

// A simple filter to only return even numbers
const evenNumbersOnly = numbers.filter((num) => {
  return num % 2 === 0
})
// evenNumbersOnly = [ 12, 52, 42, 98 ]
```

It runs something like...the number 12, our first item, is passed into the conditional. Is it even? Yes! So we keep hold of it. Then 43...is that even? Nope. Rejected. Move on. This continues until the very end. Filter checks every single item because there is the potential than every item could match the condition.

Can you see an issue with the original example?

If are using unique IDs, our filter method will find a match, and then keep looking. It doesn't know our value is unique! Imagine our data set is large, perhaps several hundred or even thousand items long. It's incredibly inefficient to find a piece of data early in the search and then continue to loop through many, many more items knowing our condition has already been met.

## Find( )

Here we have one of those methods you may have heard of, you may have even used after finding a reference on Stack Overflow, but ultimately ignored. It is possible to achieve very similar results with our current tools and so learning yet another method may have seemed pointless.

Straight from the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), "The find( ) method returns the value of the first element in the provided array that satisfies the provided testing function."

```js
const myData = [{id: 1, content="abc"}, {id: 2, content="def"}, {id: 3, content="ghi"}];

// The loop will immediate exit once the condition is satisfied.
const displayData = myData.find(item => {
  return item.id === 2;
});
// displayData = {id: 2, content="def"}

```

We are returned the exact value, not in an array and without going through any unnecessary iterations through further data. The loop will start at the beginning and methodically work through testing each item in the array against our condition and as soon as an item meets the criteria, it is saved to the variable and the loop exits. No further items in the array are tested.

Undoubtedly in many cases with limited amounts of data, the speed difference is completely negligible. But as we progress onto larger data sets, more complicated projects and just generally cleaner code, considering things like performance and redundancy become more and more important.

So, that's it! Consider using _find( )_ rather than _filter( )_ next time you need to locate just a single piece of data inside an array. It avoids repetition and the implementation is almost identical. As an added bonus, we can use _findIndex( )_ in the exact same way and have the index returned rather than the whole item.
