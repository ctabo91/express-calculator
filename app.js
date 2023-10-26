const express = require('express');
const ExpressError = require('./expressError')
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./functions');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/mean/', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError('Must pass a nums query key, with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.msg);
    }

    let result = {
        operation: 'mean',
        result: findMean(nums)
    }

    return res.send(result);
});


app.get('/median', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError('Must pass a nums query key, with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.msg);
    }

    let result = {
        operation: 'median',
        result: findMedian(nums)
    }

    return res.send(result);
});


app.get('/mode', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError('Must pass a nums query key, with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.msg);
    }

    let result = {
        operation: 'mode',
        result: findMode(nums)
    }

    return res.send(result);
});


app.get('/all', (req, res, next) => {
    if(!req.query.nums){
        throw new ExpressError('Must pass a nums query key, with a comma-separated list of numbers.', 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if(nums instanceof Error){
        throw new ExpressError(nums.msg);
    }

    let result = {
        operation: 'all',
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums)
    }

    return res.send(result);
});


app.use(function(req, res, next){
    const err = new ExpressError('Not Found', 404);
    return next(err);
});


app.use(function(err, req, res, next){
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});



app.listen(3000, () => {
  console.log("Server running on port 3000")
});