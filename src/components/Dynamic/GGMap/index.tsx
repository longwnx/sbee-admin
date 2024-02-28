import { map } from 'lodash'
import { useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { env } from '@/config'
import { layoutState } from '@/recoil'

type Props = {
  markers?: any
}

const GGMap: React.FC<Props> = ({ markers }) => {
  const layout = useRecoilValue(layoutState)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.APP_GOOGLE_API_KEY,
  })

  const [, setMap] = useState(null)

  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        height: 500,
      }}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
      center={markers?.[0]}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        rotateControl: false,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: false,
      }}
    >
      {map(markers, (marker, index) =>
        marker?.lat ? (
          <Marker
            key={index}
            position={{
              lat: marker?.lat,
              lng: marker?.lng,
            }}
            onLoad={(marker) => {
              marker.setIcon(
                Object.assign(
                  {
                    path: 'M35 17.7778C35 27.5962 27.165 35.5556 17.5 40C7.83502 35.5556 0 27.5962 0 17.7778C0 7.95938 7.83502 0 17.5 0C27.165 0 35 7.95938 35 17.7778ZM17.5 24.4444C21.1244 24.4444 24.0625 21.4597 24.0625 17.7778C24.0625 14.0959 21.1244 11.1111 17.5 11.1111C13.8756 11.1111 10.9375 14.0959 10.9375 17.7778C10.9375 21.4597 13.8756 24.4444 17.5 24.4444Z',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    scale: 1,
                  },
                  {
                    fillColor: layout?.theme?.colour?.primary || '#1F2128',
                    strokeColor: layout?.theme?.colour?.primary || '#1F2128',
                  }
                )
              )
            }}
          />
        ) : null
      )}
    </GoogleMap>
  ) : null
}

export default GGMap
