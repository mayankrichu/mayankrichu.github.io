---
title: Parallel Processing in python (ASYNCIO vs Python Multi Processing) 
author: mayank 
date: 2023-05-23
categories: [Blogging, Python, Parallel Processing, Comparison]
tags: [Parallel Processing,Python Multiprocessing Asyncio, Concurrency]
render_with_liquid: false
---


#### How can we implement concurrent functionalities in our programme?

There are two simple techniques that can be used to implement parallelism or concurrency:


1. Parallel processing
2. Asyncio

Both approaches are used slightly differently in various contexts.

Parallel processing involves dividing a task into smaller subtasks and executing them concurrently. 
On the other hand, Asyncio allows for the concurrent execution of multiple tasks.

For example, if you have thousands of rows to process, you can use parallel processing to divide the rows into subrows and process them in parallel. 
On the other hand, if you need to retrieve information from two different sources concurrently, you can fetch the data through APIs using Asyncio in an asynchronous manner.
