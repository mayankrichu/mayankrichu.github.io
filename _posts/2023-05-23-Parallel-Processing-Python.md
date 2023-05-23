---
title: Analysing forest area of Indian States
author: mayank 
date: 2023-05-23
categories: [Blogging, Python, Parallel Processing, Comparision]
tags: [Parallel Processing, Asyncio, Parallel Processing, Concurrency]
render_with_liquid: false
---


#### How can we implement concurrent functionalities in our programme?

There are two simple techniques which we can use to implement parallel or concurrency.

1. Using Parellel processing 
2. Using Syncio

Both the approach is used slighly in different contexts.

Parallel processing involves a task to be divided in to small sub tasks and implements the tasks concurrently. On the other hand
using Asyncio we can concurrently execute different tasks concurrently. 

For example, if you have thousand of rows to process then you can use parallel processing to divide the rows into
sub rows and parallelly process them. On the other hand lets suppose we have a problem where we need to retrieve
information from two different sources concurrently, then we can fetch the data through APIs using syncio in a synchronous manner.
