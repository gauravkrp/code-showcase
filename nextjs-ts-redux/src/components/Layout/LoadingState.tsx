import Loader from '../Loader';

const LoadingState = (props: any) => (
  <>
    {props.loading === true ? (
      <div className="app-loader">
        <Loader as="span" />
      </div>
    ) : null}
  </>
);

export default LoadingState;
