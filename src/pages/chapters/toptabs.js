import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Newchapter from './newchapter/newchapter'

import StackNavigationImages from './images/stackNavigationImages';

const Top = createMaterialTopTabNavigator();

export default function Toptabs(props) {
  return (
    <Top.Navigator>
      <Top.Screen name="Chapters" component={StackNavigationImages} />
      <Top.Screen name="Newchapter" navigation={props.navigation} component={Newchapter} />
    </Top.Navigator>
  );
}