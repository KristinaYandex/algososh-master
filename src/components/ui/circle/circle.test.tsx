import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Тестирование элемента Circle', () => {
  it('Корректно отрисовывает Circle без текста', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с текстом', () => {
    const circle = renderer.create(<Circle letter="test" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с head', () => {
    const circle = renderer.create(<Circle head="head" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с react-элементом в head', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с tail', () => {
    const circle = renderer.create(<Circle tail="tail" />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с react-элементом в tail', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с index', () => {
    const circle = renderer.create(<Circle index={8} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle с пропом isSmall === true', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle в состоянии default', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle в состоянии changing', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  })

  it('Корректно отрисовывает Circle в состоянии modified', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  })
})