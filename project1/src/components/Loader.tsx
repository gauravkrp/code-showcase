type LoaderProps = {
  size? : string;
  fillColor?: string;
  as?: 'div' | 'span';
}

export default function Loader (props: LoaderProps){  
  const width = props.size === 'large' ? '100px' : '40px'
  if (props.as === 'div') return(
    <div className='loader-gif' style={{width: width}}>
      <LoaderSVG fillColor={props.fillColor} />
    </div>
  )
  else return(
    <span className='loader-gif d-inline-block' style={{width: width}}>
      <LoaderSVG fillColor={props.fillColor} />
    </span>
  )
}

export const LoaderSVG = (props: { fillColor?: string}) => {
  const fillColor = props.fillColor ? props.fillColor : '#189ad2'
  return (
    <svg style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="translate(90,50)">
      <g transform="rotate(0)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="1" transform="scale(0.937096 0.937096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.98s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.98s"></animate>
      </circle>
      </g>
      </g><g transform="translate(89.68458805257912,55.01332934257217)">
      <g transform="rotate(7.200000000000001)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.98" transform="scale(0.933096 0.933096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.96s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.96s"></animate>
      </circle>
      </g>
      </g><g transform="translate(88.74332644514524,59.947595486594196)">
      <g transform="rotate(14.400000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.96" transform="scale(0.929096 0.929096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.94s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.94s"></animate>
      </circle>
      </g>
      </g><g transform="translate(87.19105943553006,64.72498210738712)">
      <g transform="rotate(21.6)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.94" transform="scale(0.925096 0.925096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.92s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.92s"></animate>
      </circle>
      </g>
      </g><g transform="translate(85.05226720175455,69.27014696406862)">
      <g transform="rotate(28.800000000000004)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.92" transform="scale(0.921096 0.921096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.9s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.9s"></animate>
      </circle>
      </g>
      </g><g transform="translate(82.36067977499789,73.51141009169893)">
      <g transform="rotate(36)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.9" transform="scale(0.917096 0.917096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.88s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.88s"></animate>
      </circle>
      </g>
      </g><g transform="translate(79.15874509685646,77.38188423714755)">
      <g transform="rotate(43.2)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.88" transform="scale(0.913096 0.913096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.86s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.86s"></animate>
      </circle>
      </g>
      </g><g transform="translate(75.4969595899476,80.82052971103157)">
      <g transform="rotate(50.400000000000006)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.86" transform="scale(0.909096 0.909096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.84s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.84s"></animate>
      </circle>
      </g>
      </g><g transform="translate(71.43307179915986,83.7731170200806)">
      <g transform="rotate(57.60000000000001)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.84" transform="scale(0.905096 0.905096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.82s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.82s"></animate>
      </circle>
      </g>
      </g><g transform="translate(67.0311716626029,86.19308209864079)">
      <g transform="rotate(64.80000000000001)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.82" transform="scale(0.901096 0.901096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.8s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.8s"></animate>
      </circle>
      </g>
      </g><g transform="translate(62.3606797749979,88.04226065180615)">
      <g transform="rotate(72)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.8" transform="scale(0.897096 0.897096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.78s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.78s"></animate>
      </circle>
      </g>
      </g><g transform="translate(57.49525258342899,89.29149002914755)">
      <g transform="rotate(79.19999999999999)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.78" transform="scale(0.893096 0.893096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.76s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.76s"></animate>
      </circle>
      </g>
      </g><g transform="translate(52.51162078117254,89.92106913713087)">
      <g transform="rotate(86.4)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.76" transform="scale(0.889096 0.889096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.74s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.74s"></animate>
      </circle>
      </g>
      </g><g transform="translate(47.48837921882746,89.92106913713087)">
      <g transform="rotate(93.60000000000001)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.74" transform="scale(0.885096 0.885096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.72s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.72s"></animate>
      </circle>
      </g>
      </g><g transform="translate(42.504747416571014,89.29149002914755)">
      <g transform="rotate(100.80000000000001)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.72" transform="scale(0.881096 0.881096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.7s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.7s"></animate>
      </circle>
      </g>
      </g><g transform="translate(37.639320225002116,88.04226065180615)">
      <g transform="rotate(108)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.7" transform="scale(0.877096 0.877096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.68s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.68s"></animate>
      </circle>
      </g>
      </g><g transform="translate(32.96882833739709,86.19308209864079)">
      <g transform="rotate(115.20000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.68" transform="scale(0.873096 0.873096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.66s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.66s"></animate>
      </circle>
      </g>
      </g><g transform="translate(28.566928200840124,83.7731170200806)">
      <g transform="rotate(122.40000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.66" transform="scale(0.869096 0.869096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.64s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.64s"></animate>
      </circle>
      </g>
      </g><g transform="translate(24.50304041005241,80.82052971103157)">
      <g transform="rotate(129.60000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.64" transform="scale(0.865096 0.865096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.62s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.62s"></animate>
      </circle>
      </g>
      </g><g transform="translate(20.841254903143547,77.38188423714755)">
      <g transform="rotate(136.79999999999998)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.62" transform="scale(0.861096 0.861096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.6s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.6s"></animate>
      </circle>
      </g>
      </g><g transform="translate(17.63932022500211,73.51141009169893)">
      <g transform="rotate(144)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.6" transform="scale(0.857096 0.857096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.58s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.58s"></animate>
      </circle>
      </g>
      </g><g transform="translate(14.947732798245454,69.2701469640686)">
      <g transform="rotate(151.20000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.58" transform="scale(0.853096 0.853096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.56s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.56s"></animate>
      </circle>
      </g>
      </g><g transform="translate(12.80894056446995,64.72498210738712)">
      <g transform="rotate(158.39999999999998)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.56" transform="scale(0.849096 0.849096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.54s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.54s"></animate>
      </circle>
      </g>
      </g><g transform="translate(11.256673554854764,59.94759548659421)">
      <g transform="rotate(165.6)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.54" transform="scale(0.845096 0.845096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.52s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.52s"></animate>
      </circle>
      </g>
      </g><g transform="translate(10.315411947420891,55.01332934257218)">
      <g transform="rotate(172.8)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.52" transform="scale(0.841096 0.841096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
      </circle>
      </g>
      </g><g transform="translate(10,50.00000000000001)">
      <g transform="rotate(180)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.5" transform="scale(0.837096 0.837096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.48s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.48s"></animate>
      </circle>
      </g>
      </g><g transform="translate(10.315411947420884,44.98667065742783)">
      <g transform="rotate(187.20000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.48" transform="scale(0.833096 0.833096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.46s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.46s"></animate>
      </circle>
      </g>
      </g><g transform="translate(11.25667355485475,40.05240451340582)">
      <g transform="rotate(194.39999999999998)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.46" transform="scale(0.829096 0.829096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.44s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.44s"></animate>
      </circle>
      </g>
      </g><g transform="translate(12.808940564469943,35.27501789261288)">
      <g transform="rotate(201.60000000000002)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.44" transform="scale(0.825096 0.825096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.42s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.42s"></animate>
      </circle>
      </g>
      </g><g transform="translate(14.947732798245454,30.729853035931384)">
      <g transform="rotate(208.8)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.42" transform="scale(0.821096 0.821096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.4s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.4s"></animate>
      </circle>
      </g>
      </g><g transform="translate(17.639320225002088,26.488589908301094)">
      <g transform="rotate(216)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.4" transform="scale(0.817096 0.817096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.38s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.38s"></animate>
      </circle>
      </g>
      </g><g transform="translate(20.84125490314353,22.618115762852465)">
      <g transform="rotate(223.2)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.38" transform="scale(0.813096 0.813096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.36s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.36s"></animate>
      </circle>
      </g>
      </g><g transform="translate(24.50304041005242,19.179470288968425)">
      <g transform="rotate(230.40000000000003)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.36" transform="scale(0.809096 0.809096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.34s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.34s"></animate>
      </circle>
      </g>
      </g><g transform="translate(28.566928200840145,16.226882979919388)">
      <g transform="rotate(237.60000000000005)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.34" transform="scale(0.805096 0.805096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.32s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.32s"></animate>
      </circle>
      </g>
      </g><g transform="translate(32.96882833739711,13.806917901359206)">
      <g transform="rotate(244.80000000000004)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.32" transform="scale(0.801096 0.801096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.3s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.3s"></animate>
      </circle>
      </g>
      </g><g transform="translate(37.639320225002095,11.957739348193861)">
      <g transform="rotate(252)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.3" transform="scale(0.997096 0.997096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.28s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.28s"></animate>
      </circle>
      </g>
      </g><g transform="translate(42.504747416571014,10.708509970852454)">
      <g transform="rotate(259.20000000000005)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.28" transform="scale(0.993096 0.993096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.26s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.26s"></animate>
      </circle>
      </g>
      </g><g transform="translate(47.488379218827475,10.078930862869136)">
      <g transform="rotate(266.40000000000003)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.26" transform="scale(0.989096 0.989096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.24s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.24s"></animate>
      </circle>
      </g>
      </g><g transform="translate(52.51162078117251,10.078930862869136)">
      <g transform="rotate(273.59999999999997)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.24" transform="scale(0.985096 0.985096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.22s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.22s"></animate>
      </circle>
      </g>
      </g><g transform="translate(57.49525258342897,10.708509970852454)">
      <g transform="rotate(280.8)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.22" transform="scale(0.981096 0.981096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.2s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.2s"></animate>
      </circle>
      </g>
      </g><g transform="translate(62.36067977499789,11.957739348193854)">
      <g transform="rotate(288)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.2" transform="scale(0.977096 0.977096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.18s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.18s"></animate>
      </circle>
      </g>
      </g><g transform="translate(67.03117166260287,13.806917901359206)">
      <g transform="rotate(295.2)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.18" transform="scale(0.973096 0.973096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.16s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.16s"></animate>
      </circle>
      </g>
      </g><g transform="translate(71.43307179915988,16.226882979919402)">
      <g transform="rotate(302.40000000000003)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.16" transform="scale(0.969096 0.969096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.14s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.14s"></animate>
      </circle>
      </g>
      </g><g transform="translate(75.49695958994758,19.179470288968417)">
      <g transform="rotate(309.59999999999997)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.14" transform="scale(0.965096 0.965096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.12s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.12s"></animate>
      </circle>
      </g>
      </g><g transform="translate(79.15874509685645,22.61811576285244)">
      <g transform="rotate(316.79999999999995)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.12" transform="scale(0.961096 0.961096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.1s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.1s"></animate>
      </circle>
      </g>
      </g><g transform="translate(82.36067977499789,26.488589908301066)">
      <g transform="rotate(324)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.1" transform="scale(0.957096 0.957096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.08s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.08s"></animate>
      </circle>
      </g>
      </g><g transform="translate(85.05226720175452,30.729853035931356)">
      <g transform="rotate(331.2)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.08" transform="scale(0.953096 0.953096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.06s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.06s"></animate>
      </circle>
      </g>
      </g><g transform="translate(87.19105943553006,35.27501789261289)">
      <g transform="rotate(338.4)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.06" transform="scale(0.949096 0.949096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.04s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.04s"></animate>
      </circle>
      </g>
      </g><g transform="translate(88.74332644514524,40.05240451340579)">
      <g transform="rotate(345.6)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.04" transform="scale(0.945096 0.945096)">
        <animateTransform attributeName="transform" type="scale" begin="-0.02s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.02s"></animate>
      </circle>
      </g>
      </g><g transform="translate(89.6845880525791,44.986670657427815)">
      <g transform="rotate(352.8)">
      <circle cx="0" cy="0" r="6" fill={fillColor} fillOpacity="0.02" transform="scale(0.941096 0.941096)">
        <animateTransform attributeName="transform" type="scale" begin="0s" values="0.8 0.8;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
      </circle>
      </g>
      </g>
    </svg>
  )
}