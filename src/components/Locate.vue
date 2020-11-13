<template>
  <div class="ol-control ol-unselectable locate">
    <button title="Locate me"

    >◎
    </button>
  </div>
</template>

<script>
    // eslint-disable-next-line

    export default {
        name: "locate-me",
        methods: {
            showUserLocationEvent() {
                if (navigator.geolocation) {
                    // console.log(navigator.geolocation)
                    navigator.geolocation.getCurrentPosition(this.showUserLocation);
                }
            },
            // eslint-disable-next-line no-unused-vars
            showUserLocation(position) {
                // console.log('showUserLocation LOCATE')
                // console.log(position)
                // if (!vectorSourceCommon.getFeatureById(-999)) {
                //     createUserLocationPoint([position.coords.longitude, position.coords.latitude], position)
                // }
                //
                // map.getView().setCenter(fromLonLat([position.coords.longitude, position.coords.latitude]));
                // map.getView().setZoom(16);
            }
        }
    }
</script>

<style>
  .locate {
    top: 20em;
    left: .5em;
  }
</style>
