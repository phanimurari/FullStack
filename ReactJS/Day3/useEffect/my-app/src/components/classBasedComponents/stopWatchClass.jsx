// StopwatchClassComponent.js
import {Component} from 'react';

class StopwatchClassComponent extends Component {
  constructor(props) {
    super(props);
    console.log('🏗️ CONSTRUCTOR: Component is being created');
    console.log('   - Setting initial state');
    console.log('   - Binding methods (if needed)');
    this.state = {
      seconds: 0,
      isRunning: false,
      intervalId: null
    };
    console.log('   - Initial state:', this.state);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('📊 GET_DERIVED_STATE_FROM_PROPS: Props have changed');
    console.log('   - nextProps:', nextProps);
    console.log('   - prevState:', prevState);
    console.log('   - This runs before every render (mount & update)');
    console.log('   - Return new state object or null');
    return null; // No state changes needed
  }

  componentDidMount() {
    console.log('🚀 COMPONENT_DID_MOUNT: Component has been mounted to DOM');
    console.log('   - Perfect place for API calls');
    console.log('   - Set up subscriptions');
    console.log('   - Start timers');
    console.log('   - DOM is ready for manipulation');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('🤔 SHOULD_COMPONENT_UPDATE: Should component re-render?');
    console.log('   - Current state:', this.state);
    console.log('   - Next state:', nextState);
    console.log('   - Return true to update, false to skip');
    return true; // Always update for this example
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('📸 GET_SNAPSHOT_BEFORE_UPDATE: Capture info before DOM update');
    console.log('   - Previous state:', prevState);
    console.log('   - Current state:', this.state);
    console.log('   - Return value goes to componentDidUpdate');
    return `Previous seconds: ${prevState.seconds}`;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('🔄 COMPONENT_DID_UPDATE: Component has been updated');
    console.log('   - Previous state:', prevState);
    console.log('   - Current state:', this.state);
    console.log('   - Snapshot:', snapshot);
    console.log('   - Good for DOM operations after state change');
  }

  componentWillUnmount() {
    console.log('💀 COMPONENT_WILL_UNMOUNT: Component is being removed');
    console.log('   - Clean up timers');
    console.log('   - Cancel API requests');
    console.log('   - Remove event listeners');
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      console.log('   - Stopwatch timer cleared');
    }
  }

  startStopwatch = () => {
    console.log('▶️ Starting stopwatch...');
    const intervalId = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }));
    }, 1000);
    
    this.setState({ isRunning: true, intervalId });
  }

  stopStopwatch = () => {
    console.log('⏹️ Stopping stopwatch...');
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({ isRunning: false, intervalId: null });
  }

  resetStopwatch = () => {
    console.log('🔄 Resetting stopwatch...');
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({ seconds: 0, isRunning: false, intervalId: null });
  }

  render() {
    console.log('🎨 RENDER: Component is rendering');
    console.log('   - Current state:', this.state);
    console.log('   - This runs on every state/props change');
    
    const { seconds, isRunning } = this.state;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Class Component Stopwatch
        </h2>
        <div className="text-4xl font-mono text-center mb-4 text-blue-600">
          {String(minutes).padStart(2, '0')}:
          {String(remainingSeconds).padStart(2, '0')}
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={this.startStopwatch}
            disabled={isRunning}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          >
            Start
          </button>
          <button
            onClick={this.stopStopwatch}
            disabled={!isRunning}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
          >
            Stop
          </button>
          <button
            onClick={this.resetStopwatch}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-blue-600 mt-2 text-center">
          Check console for lifecycle method logs!
        </p>
        
        {/* Lifecycle Methods Explanation */}
        <div className="mt-4 text-xs text-blue-700 bg-blue-100 p-3 rounded">
          <h3 className="font-bold mb-2">Lifecycle Methods Flow:</h3>
          <ul className="space-y-1">
            <li>1. Constructor → Component initialization</li>
            <li>2. getDerivedStateFromProps → Props to state sync</li>
            <li>3. render → JSX rendering</li>
            <li>4. componentDidMount → Setup after mount</li>
            <li>5. shouldComponentUpdate → Optimization check</li>
            <li>6. getSnapshotBeforeUpdate → Pre-update capture</li>
            <li>7. componentDidUpdate → Post-update operations</li>
            <li>8. componentWillUnmount → Cleanup before removal</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StopwatchClassComponent;