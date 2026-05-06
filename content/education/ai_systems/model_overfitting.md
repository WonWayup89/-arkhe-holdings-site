# Model Overfitting

## Beginner Level

### What Is It?
Model overfitting occurs when a system learns noise and idiosyncrasies in training data instead of true underlying patterns, causing poor performance on new data.

### Origin
Recognized as a fundamental risk in statistical modeling since the 1970s and amplified by complex neural networks in the 2010s.

### Why It Matters
Overfitting is the primary reason most quantitative strategies fail in live trading.

## Intermediate Level

### Market Mechanics
Detected through walk-forward testing, out-of-sample degradation, excessive parameter count relative to data, and instability of feature importance.

### How It Behaves
Models perform exceptionally well in backtests and collapse when deployed live.

### Key Data to Watch
- In-sample versus out-of-sample performance gap
- Parameter-to-data ratio
- Feature importance volatility

## Advanced Level

### Institutional Behavior
Rigorous firms enforce strict overfitting controls, model retirement policies, and continuous monitoring of live versus backtest metrics.

### Professional Use Cases
- Regularization techniques (L1/L2, dropout)
- Ensemble methods and model averaging
- Automated model decay detection

### AI Interpretation in Systems Like Arkhe
- **ML Agent**: Automatically flags and retires overfit models.
- **Risk Agent**: Quantifies overfitting contribution to overall swarm risk.

### Key Takeaways
Combating overfitting separates sustainable statistical edges from illusions.

## Related Topics
- statistical_edge.md
- predictive_modeling.md
- monte_carlo.md
