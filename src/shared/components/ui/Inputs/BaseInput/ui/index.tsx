import React, { FC, useEffect, useMemo, useState } from 'react';
import Typical from 'react-typical';

import { SIcon, SInput, SLabel, SPlaceholder, SPrevIcon } from './baseInput.styled';
import { IBaseInput, IVariantType } from '../model/IBaseInput';
import { allVariantType } from '../lib/variantType';
import { LoaderSmall } from '../../../Loaders';

// TODO: eslint
export const BaseInput: FC<IBaseInput> = ({
  border,
  type,
  height = 'inherit',
  minWidth = 'inherit',
  sizeLoading = 15,
  loading,
  isBgTransparent,
  prevIcon,
  animationPlaceholder,
  placeholder,
  ...props
}) => {
  const [variantType, setVariantType] = useState<IVariantType>();

  const generateBorderValue = useMemo(() => {
    if (border === 'left') return '0 20px 20px 0';
    if (border === 'right') return '20px 0 0 20px';
    if (border === 'none') return '5px';
    if (border === 'rightNone') return '5px 0 0 5px';
    return '20px';
  }, [border]);

  const handlePasswordIcon = () => {
    allVariantType.forEach((variant) => {
      if (variant.type !== variantType?.type) {
        setVariantType(variant);
      }
    });
  };

  useEffect(() => {
    if (type === 'password' || type === 'text') {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      type === 'password' ? setVariantType(allVariantType[0]) : setVariantType(allVariantType[1]);
    }
  }, []);

  return (
    <SLabel>
      {!!prevIcon && <SPrevIcon>{prevIcon}</SPrevIcon>}
      <SInput
        $border={generateBorderValue}
        autoComplete="off"
        type={variantType && variantType.type}
        $height={height}
        $minWidth={minWidth}
        $isBgTransparent={isBgTransparent}
        placeholder={animationPlaceholder?.length ? '' : placeholder}
        {...props}
      />
      {animationPlaceholder?.length && !props?.value && (
        <SPlaceholder>
          <Typical loop={Infinity} steps={animationPlaceholder} wrapper="p" />
        </SPlaceholder>
      )}
      {(variantType?.type === 'password' || variantType?.type === 'text') && !loading && (
        <SIcon onClick={handlePasswordIcon}>{variantType && variantType.icon}</SIcon>
      )}
      {loading && (
        <SIcon>
          <LoaderSmall size={sizeLoading} />
        </SIcon>
      )}
    </SLabel>
  );
};
