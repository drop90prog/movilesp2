import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Images from './src/pages/chapters/images/images';
import Newimage from './src/pages/chapters/images/newimage/newimage';

const Top = createMaterialTopTabNavigator();



export default function Toptabsimages(props) {
  return (
    <Top.Navigator>
      <Top.Screen name="Images" navigation={props.navigation} component={Images} />
      <Top.Screen name="New" component={Newimage} />
    </Top.Navigator>
  );
}