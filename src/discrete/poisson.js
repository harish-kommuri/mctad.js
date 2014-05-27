// # Poisson Distribution
// The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
// distribution that expresses the probability of a given number of events occurring in a fixed interval of time
// and/or space if these events occur with a known average rate and independently of the time since the last event.
//
// The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.

mctad.poisson = {
  distribution: function (λ) {
    // Check that λ is strictly positive
    if (λ <= 0) { return null; }

    // We initialize `x`, the random variable, and `cdf`, an cdfumulator for the cumulative distribution function
    // to 0. `dfs` is the object we'll return with the `pdf` and the
    // `cdf`, as well as the trivially calculated mean & variance. We iterate until the
    // `cdf` is within `epsilon` of 1.0.
    var x = 0, pdf, cdf = 0, dfs = {
      mean: λ,
      variance: λ,
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = (Math.pow(Math.E, -λ) * Math.pow(λ, x))/mctad.factorial(x);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    _.extend( dfs, mctad.mixins );

    return dfs;
  }
};
