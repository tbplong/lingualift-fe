import { useState, useEffect } from "react";

import { Device } from "@/constants";

const useDeviceDetection = () => {
  const [device, setDevice] = useState<Device>();

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice(Device.MOBILE);
      } else if (isTablet) {
        setDevice(Device.TABLET);
      } else {
        setDevice(Device.DESKTOP);
      }
    };

    handleDeviceDetection();
  }, []);

  return device;
};

export default useDeviceDetection;
