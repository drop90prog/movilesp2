import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Newchapter from './newchapter/newchapter'

import StackNavigationImages from './images/stackNavigationImages';

const Top = createMaterialTopTabNavigator();

export default function Toptabs({navigation}) {
  return (
    <Top.Navigator>
      <Top.Screen name="Chapters" navigation={navigation} component={StackNavigationImages} />
      <Top.Screen name="Newchapter" component={Newchapter} />
    </Top.Navigator>
  );
}